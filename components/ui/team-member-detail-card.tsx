import Image from "next/image";
import { Member } from "../MemberCard";


interface TeamMemberDetailCardProps {
  member: Member;
}

export function TeamMemberDetailCard({ member }: TeamMemberDetailCardProps) {
  return (
    <article className="relative w-[260px] min-h-[400px] overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(135deg,rgba(3,14,14,0.92),rgba(2,8,18,0.9))] p-5 sm:p-6">
      <div className="relative z-10 flex flex-col gap-5">
        <div className="shrink-0 flex justify-center">
          <div className="h-64 w-44 overflow-hidden rounded-lg border border-white/15 bg-white/5 shadow-[0_0_24px_rgba(20,241,217,0.16)] sm:h-72 sm:w-48">
            <Image
              src={member.image || "/tparentastro.png"}
              alt={`${member.name} portrait`}
              width={240}
              height={240}
              sizes="(max-width: 640px) 192px, 240px"
              unoptimized
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-4 text-left">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-white sm:text-xl text-center">{member.name}</h3>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-teal-400 text-center">{member.post}</p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-1">
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-teal-400/60 hover:bg-teal-400/10 hover:text-teal-200"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
              LinkedIn
            </a>
            {/* <a
              href={`mailto:${member.email}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-teal-400/60 hover:bg-teal-400/10 hover:text-teal-200"
            >
              <Mail className="h-4 w-4" />
              Email
            </a> */}
          </div>
        </div>
      </div>
    </article>
  );
}