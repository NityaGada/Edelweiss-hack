import { useEffect, useState } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

export default function Table2(props) {
  const [data, setData] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/option/');
      const html = response.data;
      const $ = cheerio.load(html);
      const specificPart = $('#data'); // Replace 'data' with the actual ID or selector of the element you want to extract
      const extractedData = specificPart.html();
      
      const dictionary = eval('(' + extractedData + ')');
      setData(dictionary);
      console.log(dictionary) 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    
    <div>
      {data}
    </div>
  );
}
