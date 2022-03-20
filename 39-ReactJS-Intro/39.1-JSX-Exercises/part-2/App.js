const App = () => {
  return (
    <div>
      <Tweet
        username='jayjay47'
        name='Jay'
        date={new Date().toDateString()}
        message='Great day to code some stuff!'
      />
      <Tweet
        username='jayjay48'
        name='Jay'
        date={new Date().toDateString()}
        message='Great day to code some stuff!'
      />
      <Tweet
        username='jayjay49'
        name='Jay'
        date={new Date().toDateString()}
        message='Great day to code some stuff!'
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
