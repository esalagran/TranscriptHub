export default function Index() {
  return (
    <>
      <style>{`
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background: #f0f4f8;
          color: #333;
        }
        header {
          background: #007BFF;
          color: white;
          padding: 20px 0;
          text-align: center;
        }
        .hero {
          text-align: center;
          padding: 100px 20px;
          background: white;
          margin: 20px 0;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .hero h1 {
          font-size: 3em;
          margin-bottom: 20px;
        }
        .hero p {
          font-size: 1.2em;
          color: #555;
        }
        footer {
          text-align: center;
          padding: 20px;
          font-size: 0.9em;
          color: #777;
          margin-top: 40px;
          border-top: 1px solid #ddd;
        }
      `}</style>

      <header>
        <h1>Transcript Hub</h1>
        <p>Your go-to destination for transcript management</p>
      </header>
      <div className="hero">
        <h1>Hello to Transcript Hub!</h1>
        <p>Effortlessly manage and organize your transcripts with our powerful platform</p>
      </div>
      <footer>
        &copy; 2026 Transcript Hub. All rights reserved.
      </footer>
    </>
  )
}
