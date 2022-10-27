import Link from "next/link";

const About = (): JSX.Element => {
    return (
        <div>
          <h1>About everything</h1>
          <p>Here you can found a little list about :</p>
          <ul>
              <li>
                <Link href='/about/me'>
                  Me
                </Link>
              </li>
            <li>
                <Link href='/about/thisApp'>
                  This app
                </Link>
            </li>
            <li>
                <Link href='/about/thisAPI'>
                  And the API i used
                </Link>
            </li>
          </ul>
        </div>
      );
}
export default About;