import { useState } from "react";
import "./index.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriends] = useState(null);
  function handleShowAddFriend() {
    setShowAddFriend((curr) => !curr);
  }
  function handleAddFrind(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }
  function handleSelectFriends(friend) {
    // setSelectedFriends(friend);
    setSelectedFriends((curr) => (curr?.id === friend.id ? null : friend));
  }
  return (
    <div className="App">
      <div className="sidebar">
        <FriendList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelectFriends}
        />
        {showAddFriend && <FormAddFriend handleAddFrind={handleAddFrind} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  );
}

function FriendList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onSelection={onSelection}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">You Owe {Math.abs(friend.balance)}</p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} Owe {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>you and {friend.name} are break even</p>}
      <Button
        onClick={() => {
          onSelection(friend);
        }}
      >
        {isSelected ? "close" : "select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ handleAddFrind }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  function FormAddFriend(e) {
    e.preventDefault();
    const id = crypto.randomUUID();
    const newFriend = {
      name,
      imageURL: `${image}?u=${id}`,
      balance: 0,
      id,
    };
    handleAddFrind(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-split-bill" onSubmit={FormAddFriend}>
      <label>👩‍👧 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🌅Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormSplitBill({ selectedFriend }) {
  return (
    <form className="form-split-bill">
      <h2>Split Bill with {selectedFriend.name}</h2>
      <label>💵Bill Value</label>
      <input type="text" />
      <label>your expense</label>
      <input type="text" />
      <label>{selectedFriend.name}'s expense</label>
      <input type="text" />
      <label>Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">Friend</option>
      </select>
    </form>
  );
}
export default App;
