node-calibre-api
====================

A little Node.JS application that expose an API to do ebook conversion using calibre ebook-convert command.


Usage
--------

Run the application by building the image and running it:
```bash
docker run --restart always -d --name calibre -p 3000:3000 denouche/node-calibre-api
```

Or by building the image using the Dockerfile.


Then to convert a .epub ebook to .mobi, use:
```
curl 'http://localhost:3000/calibre/ebook-convert' -H 'Content-Type: multipart/form-data' --form 'file=@/tmp/file.epub' --form 'to=mobi' -O -J -L -s
```

