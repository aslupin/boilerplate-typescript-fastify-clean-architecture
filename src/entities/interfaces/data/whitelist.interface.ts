interface Whitelists {
  [index: string]: Whitelist
}

interface Whitelist {
  [index: string]: { [key: string]: string }
}

export { Whitelists, Whitelist }
