import "./MemberCard.css";
import github from "/Users/laurawilliams/module-3/projects/youtube-clone-9.4/src/components/MemberCard/github-logo.png";
export default function MemberCard({ member }) {
  return (
    <div>
      {console.log(member)}
      <div className="card">
        <img id="headshot" src={member.imgUrl} alt="face" />
        <br />
        <h1 className="full-name">{member.fullName}</h1>
        <a href={member.gitHub}>
          <img className="github-icon" src={github} alt="github logo" />{" "}
        </a>
        <p className>{member.summary}</p>
      </div>
    </div>
  );
}
