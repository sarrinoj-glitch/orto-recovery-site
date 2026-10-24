// Путь к файлу из public/ с учётом basePath (на GitHub Pages сайт живёт в подпапке)
export const asset = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${p}`
