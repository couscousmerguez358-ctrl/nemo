import { SandboxResult } from "./jsSandbox";

let pyodideInstance: any = null;

const loadPyodideScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return;
    if ((window as any).loadPyodide) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Impossible de charger Pyodide."));
    document.head.appendChild(script);
  });
};

export const pyodideSandbox = {
  async execute(code: string): Promise<SandboxResult> {
    try {
      await loadPyodideScript();

      if (!pyodideInstance) {
        // Load the Pyodide WebAssembly instance
        pyodideInstance = await (window as any).loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
        });
      }

      let capturedLogs: string[] = [];
      
      // Redirect python print statements to capturedLogs
      pyodideInstance.setStdout({
        write: (text: string) => {
          capturedLogs.push(text.trim());
          return text.length;
        },
      });

      pyodideInstance.setStderr({
        write: (text: string) => {
          capturedLogs.push(text.trim());
          return text.length;
        },
      });

      // Wrap excecution to avoid infinite loops locking browser completely (5s timeout)
      const executionPromise = pyodideInstance.runPythonAsync(code);
      
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout : Exécution interrompue après 5 secondes.")), 5000)
      );

      await Promise.race([executionPromise, timeoutPromise]);

      return {
        output: capturedLogs.join("\n"),
        error: null,
      };
    } catch (err: any) {
      return {
        output: "",
        error: err.message || "Erreur d'exécution Python.",
      };
    }
  },
};
