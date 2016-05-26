# google-places-search-example
google places search script example in node.js

# Usage
Modify Input (on index.js line 8):
```js
var input = [
  {
    name: 'philz coffee',
    address: '399 Golden Gate Ave, San Francisco, CA 94102'
  }
]
// ...
```

Command:
```bash
GOOGLE_API_KEY=<google_api_key> node index.js
```

Output:
```json
{
  "name": "philz coffee",
  "address": "399 Golden Gate Ave, San Francisco, CA 94102",
  "google": {
    "id": "ChIJH7w1a5qAhYARSHYy_wjbPr4",
    "name": "Philz Coffee",
    "address": "399 Golden Gate Ave, San Francisco, CA 94102, United States",
    "phoneNumber": "(415) 621-7000"
  },
}
```

#License
MIT
