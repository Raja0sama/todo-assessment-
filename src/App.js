import { Item } from "./Item.js";
import { useState } from "react";

function App() {
  const [visible, setVisible] = useState(false);
  const [TODO, setTODO] = useState({});
  const handleSubmit = (e) => {
    if (e?.name == "") return;
    setTODO({ ...TODO, [RANDOMWORDS(4)]: e });
    setVisible(false);
  };

  const handleCheck = (id, value) => {
    const newTODO = { ...TODO };
    newTODO[id].checked = value;
    setTODO(newTODO);
  };

  // handle remove todo
  const handleRemove = () => {
    const newTODO = { ...TODO };
    Object.entries(TODO).map(([key, value]) => {
      if (value.checked) {
        delete newTODO[key];
      }
    });
    setTODO(newTODO);
  };

  const handleSingleRemove = (id) => {
    const newTODO = { ...TODO };
    if (newTODO[id] && !newTODO[id]?.status) {
      newTODO[id].status = "done";
      setTODO(newTODO);
      return;
    }
    delete newTODO[id];
    setTODO(newTODO);
  };

  return (
    <div className="h-screen bg-bg text-white relative">
      <div className="max-w-screen-lg p-10">
        <h1 className="text-4xl ">TODO 📝</h1>

        <div className="m-20 ">
          <div className="flex justify-end">
            <Button onClick={() => setVisible(true)} dark className="mr-2">
              ADD
            </Button>
            <Button onClick={handleRemove}>Remove</Button>
          </div>
          <div className="mt-20">
            <div className="grid grid-cols-3 gap-4 ">
              {Object.entries(TODO).map(([key, value]) => (
                <div
                  key={key}
                  className="flex p-2 border-2 border-white flex-col"
                >
                  <div className="h-full">
                    <input
                      checked={value?.checked}
                      type={"checkbox"}
                      onChange={(e) => handleCheck(key, e.target.checked)}
                    />
                    <p className="text-xl font-bold">{value.name}</p>
                    <p>{value.detail}</p>
                    <br />
                  </div>
                  <Button
                    dark={!value?.status ? true : false}
                    onClick={() => handleSingleRemove(key)}
                  >
                    {!value?.status ? "Mark Done" : "Remove"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {visible && (
        <Modal
          onClose={() => setVisible(false)}
          visible={visible}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

const Modal = ({ visible, onSubmit, onClose }) => {
  const [inputs, setinputs] = useState({});

  if (!visible) return <></>;
  return (
    <div className="absolute white inset-0 h-screen w-screen flex justify-center items-center">
      <div className="w-96 bg-white text-black p-2 shadow shadow-white">
        <p className="text-xl">ADD TODO</p>
        <hr />
        <Input
          placeholder={"Name"}
          onChange={(e) => setinputs({ ...inputs, name: e.target.value })}
        />
        <TextArea
          onChange={(e) => setinputs({ ...inputs, detail: e.target.value })}
          placeholder={"Detail"}
        />

        <div className="flex justify-end">
          <Button onClick={() => onSubmit(inputs)} dark className="mr-2">
            Add
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

const Input = ({ ...props }) => {
  return <input className="w-full border-2 border p-2" {...props} />;
};
const TextArea = ({ ...props }) => {
  return <textarea className="w-full border-2 border mt-5 p-2" {...props} />;
};

const Button = ({ dark, children, ...props }) => {
  const theme = !dark
    ? "border border-white hover:border-2  bg-bg text-white p-2 "
    : "border border-black  hover:border-2 text-black bg-white p-2";

  return (
    <button {...props} className={`${theme} ${props?.className}`}>
      {children}
    </button>
  );
};

function RANDOMWORDS(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default App;
