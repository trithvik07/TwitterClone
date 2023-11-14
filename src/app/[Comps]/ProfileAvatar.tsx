import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import placeholder from "../../../public/placeholder.png"
const ProfileAvatar = ({ image }: { image: string }) => {
  return (
    <Avatar>
      <AvatarImage src={image} alt="profile" />
      <AvatarFallback>DP</AvatarFallback>
    </Avatar>
  )
}

export default ProfileAvatar