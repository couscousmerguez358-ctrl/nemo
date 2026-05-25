import { jsSandbox, SandboxResult } from "./jsSandbox";
import { pyodideSandbox } from "./pyodideSandbox";
import { sqlSandbox, SqlSandboxResult } from "./sqlSandbox";

export const SandboxAdapter = {
  async execute(
    code: string,
    language: string,
    seedSql?: string
  ): Promise<SqlSandboxResult | SandboxResult> {
    const lang = language.toLowerCase();

    switch (lang) {
      case "javascript":
      case "js":
      case "html":
      case "css":
        return await jsSandbox.execute(code);

      case "python":
      case "py":
        return await pyodideSandbox.execute(code);

      case "sql":
      case "sqlite":
        return await sqlSandbox.execute(code, seedSql);

      default:
        return {
          output: "",
          error: `Le langage "${language}" n'est pas pris en charge par le compilateur V1.`,
        };
    }
  },
};
