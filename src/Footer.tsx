import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="fixed left-0 bottom-0 right-0 bg-black p-1 border-t-4 border-red-800">
      <ul className="list-none flex justify-around items-center text-white text-lg">
        <li className="hover:text-blue-400">
          <Link to="/">Main</Link>
        </li>
        {/* TODO: Figure out how to make this link inactive if the user is playing */}
        <li className="hover:text-blue-400">
          <Link to="/play">Play</Link>
        </li>
        <li className="hover:text-blue-400">
          <a href="https://trejdon.github.io/" target="_blank">
            Trejdon Dev
          </a>
        </li>
        <li className="hover:text-blue-400">
          <a href="https://github.com/Trejdon/bones-clone" target="_blank">
            Source{" "}
            <img
              className="h-5 pb-1 inline-block "
              src="./public/github-mark-white.svg"
              alt="github logo"
            />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
