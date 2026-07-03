import React from "react";
import type { ServerFunctionClient } from "payload";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import configPromise from "@payload-config";
import { importMap } from "./admin/importMap.js";
import "@payloadcms/next/css";
import "./custom.scss";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const serverFunction: ServerFunctionClient = async function (args) {
    "use server";
    return handleServerFunctions({ ...args, config: configPromise, importMap });
  };

  return (
    <RootLayout config={configPromise} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
}
