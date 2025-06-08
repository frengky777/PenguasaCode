import * as React from "react";
import { cn } from "@/lib/utils";

const Table = ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
  <table className={cn("w-full text-left text-sm", className)} {...props} />
);
const TableHeader = ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={cn("border-b", className)} {...props} />
);
const TableBody = ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody {...props} />
);
const TableRow = ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className={cn("border-b", className)} {...props} />
);
const TableHead = ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
  <th className={cn("px-4 py-2 font-medium text-gray-400", className)} {...props} />
);
const TableCell = ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn("px-4 py-2", className)} {...props} />
);

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
};
