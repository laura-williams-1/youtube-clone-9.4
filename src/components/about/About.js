import React from "react";
import MemberCard from "../MemberCard/MemberCard";
import teamMembers from "../TeamMembers";
import ProjectSummary from "./ProjectSummary/ProjectSummary";
export default function About() {
  return (
    <div>
      <ProjectSummary />
      <div className="TeamMembers">
        {teamMembers.map((member) => {
          return (
            <MemberCard
              member={member}
              name={member.fullName}
              imgUrl={member.imgUrl}
              summary={member.summary}
              gitHub={member.gitHub}
              key={member.id}
            />
          );
        })}
      </div>
    </div>
  );
}
