
function App() {
  return (
    <div>
      <BrowserRouter>
       
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Send" element={<Send />} />
        </Routes>
      </BrowserRouter>

    </div>
    
  )
}

export default App
