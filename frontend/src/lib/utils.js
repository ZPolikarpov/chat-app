export function formatMessageTime(timestamp) {
  const now = new Date()
  const messageTime = new Date(timestamp)
  const timeDifference = now - messageTime
  if (timeDifference < 60 * 1000) {
    return 'just now'
  }

  if (timeDifference < 24 * 60 * 60 * 1000) {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  if (timeDifference < 2 * 24 * 60 * 60 * 1000) {
    return "yesterday"
  }

  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
  })
}