using AutoMapper;
using Netflix.API.DTOs.ChatDtos;
using Netflix.API.Models;

namespace Netflix.API.Mappings
{
    public class ChatMappingProfile : AutoMapper.Profile
    {
        public ChatMappingProfile()
        {
            CreateMap<ChatConversation, ConversationDto>()
                .ForMember(dest => dest.Messages, opt => opt.MapFrom(src => src.Messages.OrderBy(m => m.CreatedAt)));

            CreateMap<ChatMessage, ChatMessageDto>()
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.ToString()));
        }
    }
}