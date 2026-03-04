import { redirect } from "next/navigation";

import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewById,
  getFeedbackByInterviewId,
} from "@/lib/actions/general.actions";

const InterviewDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  const user = await getCurrentUser();
  const interview = await getInterviewById(id);

  if (!interview) redirect("/");

  const feedback =
    user && id
      ? await getFeedbackByInterviewId({
          interviewId: id,
          userId: user.id,
        })
      : null;

  return (
    <>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="capitalize">{interview.role} Interview</h3>
          <p className="text-sm text-gray-400">
            {interview.type} · {interview.level}
          </p>
        </div>

        <div className="flex flex-row gap-2 items-center">
          {interview.techstack.map((tech) => (
            <span
              key={tech}
              className="text-sm bg-dark-300 px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <Agent
        userName={user?.name ?? "Guest"}
        userId={user?.id}
        interviewId={id}
        type="interview"
        questions={interview.questions}
        feedbackId={feedback?.id}
      />
    </>
  );
};

export default InterviewDetails;
