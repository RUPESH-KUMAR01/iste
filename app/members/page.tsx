import { memberDetails } from "@/components/data"
import MemberCard, { Member } from "@/components/MemberCard"

const page = () => {



  return (
    <div className="pt-22 w-full flex flex-col items-center">
      
        <div className="w-[80%] mt-10 flex flex-col items-center">
            <p className="text-4xl font-semibold ">Explorers</p>
        </div>
        <div className="mt-20 w-[80%] flex flex-wrap gap-8 justify-center">
            {
              memberDetails.map((member: Member, index:number) => (
                <div key={index}>
                  <MemberCard name={member.name} sig={member.sig} post={member.post} />
                </div>
              ))
            }
        </div>
    </div>
  )
}


export default page