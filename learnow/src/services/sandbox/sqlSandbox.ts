let sqlInstance: any = null;

const loadSqlScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return;
    if ((window as any).initSqlJs) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Impossible de charger SQL.js"));
    document.head.appendChild(script);
  });
};

export interface SqlSandboxResult {
  output: string;
  error: string | null;
  columns?: string[];
  rows?: any[][];
}

export const sqlSandbox = {
  async execute(code: string, seedSql?: string): Promise<SqlSandboxResult> {
    try {
      await loadSqlScript();

      if (!sqlInstance) {
        // Initialize SQL.js WebAssembly compiler
        sqlInstance = await (window as any).initSqlJs({
          locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`,
        });
      }

      // Create éphémère in-memory SQLite database
      const db = new sqlInstance.Database();

      // Seed tables and mock data if provided (e.g. create table users, insert values)
      if (seedSql) {
        db.run(seedSql);
      }

      // Run query
      const result = db.exec(code);

      if (result.length === 0) {
        db.close();
        return {
          output: "Requête exécutée avec succès (aucune ligne renvoyée).",
          error: null,
          columns: [],
          rows: [],
        };
      }

      // Capture database query output (cols and rows)
      const queryResult = result[0];
      const columns = queryResult.columns;
      const rows = queryResult.values;

      // Print output in standard styled terminal visual table
      const formattedOutput = [
        columns.join(" | "),
        "-".repeat(columns.join(" | ").length),
        ...rows.map((row: any) => row.join(" | ")),
      ].join("\n");

      db.close();

      return {
        output: formattedOutput,
        error: null,
        columns,
        rows,
      };
    } catch (err: any) {
      return {
        output: "",
        error: err.message || "Erreur d'exécution de la requête SQL.",
      };
    }
  },
};
