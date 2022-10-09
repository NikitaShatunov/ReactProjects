import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const [invites, setInvites] = React.useState([]);
  const [success, setSuccess] = React.useState(false);
  React.useEffect(() => {
    fetch('https://reqres.in/api/users')
    .then(result => result.json())
    .then(json => {
      setUsers(json.data)
    }).catch(err => {
      console.warn(err)
      alert("Error!")
    }).finally(() => setLoading(false))
  }, [])

  const onChangeSearch = (event) => {
    setSearch(event.target.value)
  }
  const onClickInvite =(id) => {
    if(invites.includes(id)){
      setInvites(prev => prev.filter(_id => _id !== id));
    } else {
      setInvites(prev => [...prev, id])
    }
  }
  const onClickSend = () => {
    setSuccess(true);
  }
  return (
    <div className="App">
      {
        success ?  <Success count={invites.length}/> : <Users 
        search = {search} 
        items = {users} 
        isLoading={isLoading}
        onChangeSearch={onChangeSearch}
        invites={invites}
        onClickInvite={onClickInvite}
        onClickSend={onClickSend}
        />
      
      }
      </div>
  );
}

export default App;