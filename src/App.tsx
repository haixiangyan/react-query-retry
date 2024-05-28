import {useState} from 'react'
import './App.css'

interface QueryResult {
  id: string;
  text: string;
}

interface ListItem {
  id: string;
  name: string;
}

let counter = 0;

const fetchList = (): Promise<ListItem[]> => {
  console.log('start fetch...')
  counter += 1;
  // 成功
  if (counter === 3) {
    return new Promise(resolve => {
      counter = 1;

      setTimeout(() => {
        console.log('fetch success!')
        resolve([
          {
            id: '1',
            name: '1',
          },
          {
            id: '2',
            name: '2',
          },
        ]);
      }, 2000);
    })
  }

  // 失败
  return new Promise((_, reject) => {
    setTimeout(() => {
      console.log('fetch error!')
      reject('timeout');
    }, 2000);
  })
}

const pushResults = (results: QueryResult[], text: string): QueryResult[] => {
  return [
    ...results,
    {
      id: String(results.length + 1),
      text,
    }
  ]
}

function App() {
  const [results, setResults] = useState<QueryResult[]>([]);

  const onQuery = async () => {
    // Results 有问题
    console.log('ressults', results);
    try {
      const list = await fetchList();

      setResults(r => pushResults(r, JSON.stringify(list)));
    } catch (e) {
      setResults(r => pushResults(r, String(e)));

      await onQuery();
    }
  }

  return (
    <div>
      <button onClick={onQuery}>Query</button>

      <ul>
        {results.map(result => (
          <li key={result.id}>{result.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
