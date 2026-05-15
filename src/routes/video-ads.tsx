import { createFileRoute } from '@tanstack/react-router'
import VideoTemplate from '../components/video/VideoTemplate'

export const Route = createFileRoute('/video-ads')({
  component: VideoAdsComponent,
})

function VideoAdsComponent() {
  return <VideoTemplate />
}
