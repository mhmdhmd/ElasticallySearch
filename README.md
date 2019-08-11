# ElasticallySearch
Realtime search in nativescript/angular app using elasticsearch, nodejs and rxjs

## Usage

- install [elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/5.1/windows.html) as service on your machine before build and run code.
- run <code>npm i</code> to restore node_modules packages
- run <code>node initial.js</code> to seed data in elasticsearch index
- run <code>node index.js</code> to run express service
- run <code>tns run android/ios --bundle</code> to run client side app

## Note

Be careful about <code>get method's url</code> in <code>item.service.ts</code> file
