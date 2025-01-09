/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "jspdf-autotable" {
  import { jsPDF } from "jspdf";
  function autoTable(doc: jsPDF, options: any): void;
  export = autoTable;
}
