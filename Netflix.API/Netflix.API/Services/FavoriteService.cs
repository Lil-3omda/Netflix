using AutoMapper;
using Netflix.API.DTOs.FavoriteDtos;
using Netflix.API.Models;
using Netflix.API.Repositories.FavoriteRepository;
using Netflix.API.Repositories.Interfaces;
using Netflix.API.Services.Interfaces;

namespace Netflix.API.Services
{
    public class FavoriteService : IFavoriteService
    {
        private readonly IFavoriteRepository _favoriteRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public FavoriteService(IFavoriteRepository favoriteRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _favoriteRepository = favoriteRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<bool> AddFavoriteAsync(AddFavoriteDto dto)
        {
            var existing = await _favoriteRepository.GetByProfileAndVideoAsync(dto.ProfileId, dto.VideoId);
            if (existing != null)
                return false;
            var favorite = _mapper.Map<Favorite>(dto);
            await _favoriteRepository.AddAsync(favorite);
            await _unitOfWork.SaveAsync();
            return true;
        }

        public async Task<IEnumerable<FavoriteDto>> GetFavoritesByProfileIdAsync(int profileId)
        {
            var favorites = await _favoriteRepository.GetByProfileIdAsync(profileId);
            return _mapper.Map<IEnumerable<FavoriteDto>>(favorites);
        }

        public async Task<bool> RemoveFavoriteAsync(int profileId, int videoId)
        {
            var existing = await _favoriteRepository.GetByProfileAndVideoAsync(profileId, videoId);
            if (existing == null) 
                return false;
            _favoriteRepository.Delete(existing);
            await _unitOfWork.SaveAsync();
            return true;
        }
    }
}
