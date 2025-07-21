using AutoMapper;
using Netflix.API.DTOs.WatchProgressDtos;
using Netflix.API.Models;
using Netflix.API.Repositories.Interfaces;
using Netflix.API.Services.Interfaces;

namespace Netflix.API.Services
{
    public class WatchProgressService : IWatchProgressService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public WatchProgressService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<WatchProgressDto?> GetProgressAsync(int profileId, int videoId)
        {
            var progress = await _unitOfWork.WatchProgress.GetByProfileAndVideoAsync(profileId, videoId);
            return progress != null ? _mapper.Map<WatchProgressDto>(progress) : null;
        }

        public async Task<bool> UpdateProgressAsync(CreateOrUpdateWatchProgressDto dto)
        {
            var existing = await _unitOfWork.WatchProgress.GetByProfileAndVideoAsync(dto.ProfileId, dto.VideoId);
            if (existing != null)
            {
                existing.CurrentTime = dto.CurrentTime;
                _unitOfWork.WatchProgress.Update(existing);
            }
            else
            {
                var entity = _mapper.Map<WatchProgress>(dto);
                await _unitOfWork.WatchProgress.AddAsync(entity);
            }
            await _unitOfWork.SaveAsync();
            return true;
        }
    }
}
