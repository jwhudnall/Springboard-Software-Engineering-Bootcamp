const App = () => {
  return (
    <div>
      <Tweet
        username='jayjay47'
        name='Jay'
        date='2022-03-19'
        message='Great day to code some stuff!'
      />
      <Tweet
        username='jayjay48'
        name='Jay'
        date='2022-03-19'
        message='Great day to code some stuff!'
      />
      <Tweet
        username='jayjay49'
        name='Jay'
        date='2022-03-19'
        message='Great day to code some stuff!'
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
