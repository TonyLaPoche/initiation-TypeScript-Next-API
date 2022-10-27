import Image from "next/image";
import style from '../../styles/about.module.css'

const aboutMe = () => {
    return (
        <>
            <div className={style.container}>
                <h1>About me</h1>
                <div>
                    <div className={style.avatar}>
                    <Image
                        src="/assets/image/meAvatar.png"
                        alt="picture of me (avatar chibi)"
                        width={200}
                        height={200}
                    />
                    </div>
                    <p>
                        My name is Antoine Terrade.
                        <br />
                        I&apos;m 27 years old and i live in france in the french-swiss periphery.
                    </p>
                    <p>
                        I am a young front end web developer.
                    </p>
                    <p>
                        I graduated from bootCamp (o&apos;clock school) and I fell in love with front-end web development, especially with JavaScrip language and everything around it (React, Redux, TypeScript, Next.js).
                    </p>
                    <p>
                        I&apos;m currently looking for an internship in remote for a few months for a company I am available immediately.
                    </p>
                    <p>
                        Find all my networks and contact information here
                    </p>
                </div>
            </div>
        </>
    )
}

export default aboutMe