import { parse } from 'csv-parse';
import fs from 'fs';

const path = new URL('./import.csv', import.meta.url);

const stream = fs.createReadStream(path);

const objectParser = parse({
    delimiter: ',',
    skipEmptyLines: true,
    fromLine: 2
  });

async function importCSV() {
    const parser = stream.pipe(objectParser);
  
    for await (const line of parser) {
      const [title, description] = line;
  
      await fetch('http://localhost:3333/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
        })
      });
    }  
  }

  importCSV();