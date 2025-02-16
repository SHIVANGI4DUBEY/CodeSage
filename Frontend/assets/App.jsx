import { useState ,useEffect} from 'react'

import prism from "prismjs";
import"prismjs/themes/prism-tomorrow.css"
import"prismjs/components/prism-jsx"
import Editor from "react-simple-code-editor"
import './App.css'
import axios from 'axios'
import Markdown from'react-markdown'
import rehypeHighlight from 'rehype-highlight';
import "highlight.js/styles/github-dark.css"

function App() {
  const [count, setCount] = useState(0)
  const [code,setCode]=useState( `function sum(){
    return 1+1;
      }`)


      //TO SHOW RES ON O/P TAB
const [review,setReview]=useState(``)

useEffect(()=>{
prism.highlightAll();
},[])
async function reviewCode(){
const response=await axios.post('http://localhost:3000/ai/get-review',{code})
//console.log(response.data)
setReview(response.data);
}
  /*return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )*/
return(
<>
<main>
  <div className="left">
    <div className="code"> 
      <Editor
      value={code}
      onValueChange={code => setCode(code)}
      highlight={code=>prism.highlight(code,prism.languages.javascript,"javascript")}
      padding={10}
      style={{
        fontFamily:'"Fira code","Fira Mono",monospace',
        fontSize:16,
        border:"1px solid #ddd",
        borderRadius:'5px',
        height:"100%",
        width:"100%"
      }}

      >

      </Editor>
      
    </div>
     <div onClick={reviewCode} className="review">REVIEW</div> 
     </div>
  <div 
  
  className="right">
   <Markdown
   rehypePlugins={[rehypeHighlight]}
   >
    {review}</Markdown> 
  </div>

</main>
</>)
}

export default App
