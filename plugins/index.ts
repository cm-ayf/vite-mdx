import type { PluginOption } from "vite";
import assets from "./assets";
import server from "./server";

export default function pages(): PluginOption[] {
  return [assets(), server()];
}
