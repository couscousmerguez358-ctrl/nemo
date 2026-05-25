export interface SandboxResult {
  output: string;
  error: string | null;
}

export const jsSandbox = {
  execute(code: string): Promise<SandboxResult> {
    return new Promise((resolve) => {
      // Create sandboxed iframe
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.setAttribute("sandbox", "allow-scripts");
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) {
        document.body.removeChild(iframe);
        resolve({ output: "", error: "Erreur d'initialisation du bac à sable HTML." });
        return;
      }

      let capturedLogs: string[] = [];
      let caughtError: string | null = null;

      // Handle message logs from within iframe
      const messageHandler = (event: MessageEvent) => {
        if (event.data && event.data.type === "learnow-sandbox-log") {
          capturedLogs.push(event.data.log);
        } else if (event.data && event.data.type === "learnow-sandbox-error") {
          caughtError = event.data.error;
        }
      };

      window.addEventListener("message", messageHandler);

      // Inject custom log capturing and user code
      const iframeContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <script>
              const logToParent = (log) => {
                window.parent.postMessage({ type: 'learnow-sandbox-log', log: String(log) }, '*');
              };
              const errorToParent = (err) => {
                window.parent.postMessage({ type: 'learnow-sandbox-error', error: String(err) }, '*');
              };
              
              window.console.log = function(...args) {
                logToParent(args.join(' '));
              };
              
              window.onerror = function(message, source, lineno, colno, error) {
                errorToParent(message);
                return true;
              };
            </script>
          </head>
          <body>
            <script>
              try {
                ${code}
              } catch (e) {
                errorToParent(e.message);
              }
            </script>
          </body>
        </html>
      `;

      iframeDoc.open();
      iframeDoc.write(iframeContent);
      iframeDoc.close();

      // Set execution safety limit of 1.5 seconds for JS
      setTimeout(() => {
        window.removeEventListener("message", messageHandler);
        try {
          document.body.removeChild(iframe);
        } catch {
          // ignore
        }
        resolve({
          output: capturedLogs.join("\n"),
          error: caughtError,
        });
      }, 1200);
    });
  },
};
