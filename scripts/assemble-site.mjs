#!/usr/bin/env node
/**
 * 本地组装 Pages 部署产物：模拟 GitHub Actions 里的 "Assemble site" 步骤。
 * 产出 _site/，包含 VitePress 文档 + 老静态 HTML 目录 + assets/。
 *
 * 用法：先 `npm run docs:build`（产出 book/），再 `npm run site:assemble`。
 * 或直接 `npm run site:build` 一步到位。
 */
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..')
const siteDir = resolve(repoRoot, '_site')
const bookDir = resolve(repoRoot, 'book')

if (!existsSync(bookDir)) {
  console.error('[assemble-site] book/ not found. Run `npm run docs:build` first.')
  process.exit(1)
}

// 1) VitePress 产物 -> _site
rmSync(siteDir, { recursive: true, force: true })
mkdirSync(siteDir, { recursive: true })
cpSync(bookDir, siteDir, { recursive: true })
console.log('[assemble-site] copied book/ -> _site/')

// 2) 静态目录（老 HTML 页面 + 共享资源）
const extras = ['assets', 'farewell', 'love', 'test', 'others', 'apologize', 'summary', 'img', 'resources']
for (const name of extras) {
  const src = resolve(repoRoot, name)
  if (!existsSync(src) || !statSync(src).isDirectory()) continue
  const dst = resolve(siteDir, name)
  mkdirSync(dst, { recursive: true })
  cpSync(src, dst, { recursive: true })
  console.log(`[assemble-site] included: ${name}`)
}

// 3) sanity check
const musts = ['assets/xui.js', 'assets/xui.css']
for (const rel of musts) {
  const p = resolve(siteDir, rel)
  if (!existsSync(p)) {
    console.error(`[assemble-site] MISSING: ${rel}`)
    process.exit(1)
  }
}
console.log('[assemble-site] OK')
console.log(`[assemble-site] top level: ${readdirSync(siteDir).sort().join(', ')}`)
