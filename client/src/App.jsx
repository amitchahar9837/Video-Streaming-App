import React from 'react'

const App = () => {
  return (
    <div style={{width:"90vw", height:'90vh'}}>
      <video style={{width:"100%", height:"100%"}} src="http://localhost:3000/video" controls></video>
    </div>
  )
}

export default App