export default function MemberCard({ member }) {
  return (
    <div>
      {console.log(member)}
      <div>
        <h2>{member.fullName}</h2>
        <img src={member.imgUrl} />
        <h3>{member.summary}</h3>
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
