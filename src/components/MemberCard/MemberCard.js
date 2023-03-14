import "./MemberCard.css";
export default function MemberCard({ member }) {
  return (
    <div>
      {console.log(member)}
      <div className="card">
        <h1>{member.fullName}</h1>
        <img src={member.imgUrl} alt="face" />

        <p>{member.summary}</p>

        <b>
          <p>
            {member.fullName.split(" ")[0]}'s{" "}
            <a href={member.gitHub}>GitHub Profile </a>
          </p>
        </b>
      </div>
    </div>
  );
}
