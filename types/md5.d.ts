declare module 'md5.js' {
  class MD5 {
    update(data: string | Buffer): this;
    digest(encoding?: 'hex' | 'binary'): string;
  }
  export default MD5;
}
