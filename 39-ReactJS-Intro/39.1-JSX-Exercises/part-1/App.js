const App = () => {
  return (
    <div>
      <FirstComponent />
      <NamedComponent name='James' />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
