#!/usr/bin/env node
/**
 * 把 assets/*（xui.js / xui.css / log.js / promise.js 等）复制到：
 *   1) docs/public/xui-assets/  ← dev server 使用
 *   2) book/xui-assets/         ← 生产产物使用（直接放到 outDir）
 *
 * 由 predocs:dev / postdocs:build 触发。
 */
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..')
const src = resolve(repoRoot, 'assets')

if (!existsSync(src)) {
  console.error(`[copy-public-assets] source not found: ${src}`)
  process.exit(1)
}

const targets = [
  resolve(repoRoot, 'docs/public/xui-assets'),
  resolve(repoRoot, 'book/xui-assets'),
]

for (const dst of targets) {
  // 只对已经存在父目录的 target 执行（book/ 不一定在 predocs 阶段存在，跳过）
  const parent = dirname(dst)
  if (!existsSync(parent)) {
    console.log(`[copy-public-assets] skip ${dst} (parent not found)`)
    continue
  }
  if (existsSync(dst)) rmSync(dst, { recursive: true, force: true })
  mkdirSync(dst, { recursive: true })
  cpSync(src, dst, { recursive: true })
  console.log(`[copy-public-assets] copied ${src} -> ${dst}`)
}
