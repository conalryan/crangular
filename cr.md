# Crangular

Scaffold
--------------------------------------------------------------------------------
```bash
ng new crangular --createApplication=false

? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS   [ http://sass-lang.com/documentation/file.SASS_REFERENCE.html#syntax ]
CREATE crangular/README.md (1026 bytes)
CREATE crangular/.editorconfig (246 bytes)
CREATE crangular/.gitignore (629 bytes)
CREATE crangular/angular.json (135 bytes)
CREATE crangular/package.json (1260 bytes)
CREATE crangular/tsconfig.json (435 bytes)
CREATE crangular/tslint.json (1621 bytes)

> fsevents@1.2.9 install /Users/cryan/code/p/crangular/node_modules/fsevents
> node install

node-pre-gyp WARN Using request for node-pre-gyp https download
[fsevents] Success: "/Users/cryan/code/p/crangular/node_modules/fsevents/lib/binding/Release/node-v64-darwin-x64/fse.node" is installed via remote

> core-js@2.6.9 postinstall /Users/cryan/code/p/crangular/node_modules/core-js
> node scripts/postinstall || echo "ignore"

added 729 packages from 854 contributors and audited 23138 packages in 22.486s
found 0 vulnerabilities

    Successfully initialized git.
```

Set Defaults
--------------------------------------------------------------------------------

angular.json
--------------------------------------------------------------------------------
- CLI defaults to:
  - workspace level, which can be overridden by defaults set at the:
  - project level, which can be overridden by:
  - command line.

changeDetection OnPush, style scss, prefix cr
```bash
ng config schematics.@schematics/angular:component.changeDetection OnPush
ng config schematics.@schematics/angular:component.prefix cr
ng config schematics.@schematics/angular:component.style scss
ng config schematics.@schematics/angular:directive.prefix cr
```

```json
"@schematics/angular:component": {
    "changeDetection": "OnPush",
    "prefix": "cr",
    "style": "scss"
  },
  "@schematics/angular:directive": {
    "prefix": "cr"
  }
}
```

ng-bootstrap
--------------------------------------------------------------------------------
```bash
yarn add @ng-bootstrap/ng-bootstrap@4
```
bootstrap
--------------------------------------------------------------------------------
```bash
yarn add bootstrap
```
styles.scss
```scss
@import '~bootstrap/scss/bootstrap';
```

examples app
--------------------------------------------------------------------------------
```bash
ng g app examples --style=scss --prefix=cr --routing
```
I'm surprised I still need to specify `--style=scss` and `prefix=cr` even though the were added as defaults.

crangular lib
--------------------------------------------------------------------------------
```bash
ng g lib crangular --style=scss --prefix=cr
```

calendargrid module
--------------------------------------------------------------------------------
```bash
ng g m calendargrid --project crangular
```

Bitmask
--------------------------------------------------------------------------------

Setup an array of numbers that will be used as a bitmask for the row visibility.
Rational: 
- number is 64 bit precission floating point. 
- Bitmask is 32 bit signed integer.
- Store 62 rows of data in same memory footprint as single number
```typscript
visibleByNumber = new Set<number>();
visibleByMask = [0,1];
```

```bash
ng g m bits --project crangular
ng g c bits --project crangular -it -is
ng g c bits-ex --project examples --spec false
```

Schematics
--------------------------------------------------------------------------------



Packaging
--------------------------------------------------------------------------------

```bash
cd dist/some-lib
npm pack
```

Creates a tar ball

Reference tar ball with file url
package.json
```json
dependencies: {
...
"some-lib": "file:some/path/dist/some-lib-0.0.1.tgz"
...
}
```

Add scope name in package.json
`@myStuff/some-lib`

Add publish task to package.json
```json
"publish": "cd dist/some-lib && npm publish"
```


