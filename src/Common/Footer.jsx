import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className="Footer">
        <div className="Footer_Container">
          <div className="Footer__Box">
            <div className="Content_Box">
              <h1>PIZZA HUT</h1>
              <p>
                Led by our talented team of chefs, our culinary philosophy is
                rooted in sourcing the freshest, locally-sourced ingredients to
                craft dishes that celebrate seasonal flavors and global
                influences.
              </p>
            </div>
            <div className="Content_Box">
              <h1>COMPANY</h1>
              <Link>Contact Us</Link>
              <Link>Help</Link>
              <Link>FAQ</Link>
            </div>
            <div className="Content_Box">
              <h1>Address</h1>
              <p>xxx,yyyyy,</p>
              <p>xxxxxxxxx</p>
              <p>123456</p>
            </div>
          </div>
          <div className="seperator__Line"></div>
          <div className="copyright">
            Copyright 2023 @ Pizza Hut Private Limited. All Rights Reserved
          </div>
        </div>
      </div>
    </>
  );
}
