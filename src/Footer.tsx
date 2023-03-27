import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-container">
      <ul className="footer-list">
        <li className="hover:text-blue-400">
          <Link to="/">Main</Link>
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
              src="./github-mark-white.svg"
              alt="github logo"
            />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
