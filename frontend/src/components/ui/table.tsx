"use client";

import * as React from "react";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="relative w-full overflow-x-auto">
      <table className={cn("w-full text-sm", className)} {...props} />
    </div>
  );
}

export function TableHeader(props: React.ComponentProps<"thead">) {
  return <thead className="[&_tr]:border-b" {...props} />;
}

export function TableBody(props: React.ComponentProps<"tbody">) {
  return <tbody {...props} />;
}

export function TableRow(props: React.ComponentProps<"tr">) {
  return (
    <tr
      className="border-b hover:bg-muted/50 transition-colors"
      {...props}
    />
  );
}

export function TableHead(props: React.ComponentProps<"th">) {
  return (
    <th
      className="h-10 px-3 text-left font-medium text-muted-foreground"
      {...props}
    />
  );
}

export function TableCell(props: React.ComponentProps<"td">) {
  return <td className="p-3" {...props} />;
}
