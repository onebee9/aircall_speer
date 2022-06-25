import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import InteractiveList from './components/ActivityFeed.jsx';
import ActivityDetail from './components/ActivityDetail.jsx';

const App = () => {
  return (
    <div className='container'>
      <Header />
      <div className="container-view">
        Archive all
        {/*remember to move padding below to stylesheet */}
        {/* <i class="fa-solid fa-folder-closed " ></i>   */}
      </div>
      <div className="call-log">
        <InteractiveList />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
