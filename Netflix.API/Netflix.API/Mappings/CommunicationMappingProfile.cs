using AutoMapper;
using Netflix.API.DTOs.ConversationDtos;
using Netflix.API.DTOs.MessageDtos;
using Netflix.API.Models;

namespace Netflix.API.Mappings
{
    public class CommunicationMappingProfile : AutoMapper.Profile
    {
        public CommunicationMappingProfile()
        {
            // Message mappings
            CreateMap<Message, MessageDto>()
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type.ToString()))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()))
                .ForMember(dest => dest.SenderName, opt => opt.MapFrom(src => src.Sender != null ? src.Sender.FullName : "System"));

            CreateMap<CreateMessageDto, Message>();

            // Conversation mappings
            CreateMap<Conversation, ConversationDto>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()))
                .ForMember(dest => dest.AssignedAdminName, opt => opt.MapFrom(src => src.AssignedAdmin != null ? src.AssignedAdmin.FullName : null))
                .ForMember(dest => dest.LastMessage, opt => opt.MapFrom(src => src.Messages.OrderByDescending(m => m.CreatedAt).FirstOrDefault()))
                .ForMember(dest => dest.Messages, opt => opt.MapFrom(src => src.Messages.OrderBy(m => m.CreatedAt)));

            CreateMap<CreateConversationDto, Conversation>();
        }
    }
}