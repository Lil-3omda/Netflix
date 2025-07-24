using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Netflix.API.DTOs.RatingDTOs;
using Netflix.API.DTOs.VideoDTO;
using Netflix.API.Models;
using Netflix.API.Repositories.Interfaces;

namespace Netflix.API.Controllers.VideoController
{
    [Route("api/Videos")]
    [ApiController]
    public class VideoController : ControllerBase
    {
        IUnitOfWork _unitOfWork;
        IMapper _mapper;

        public VideoController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        // Get All Videos
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var videos = await _unitOfWork.Videos.GetAllAsync();
            var result = _mapper.Map<List<VideoResponseDto>>(videos);
            return Ok(result);
        }

        // Get Video By Id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByid(int id)
        {
            var video = await _unitOfWork.Videos.GetByIdAsync(id);
            if (video == null)
                return NotFound("Video not found!");
            var result = _mapper.Map<VideoResponseDto>(video);
            return Ok(result);
        }

        //  Get paged videos
        //[HttpGet("paged")]
        //public async Task<IActionResult> GetPaged([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        //{
        //    var videos = await _unitOfWork.Videos.GetPagedVideosAsync(pageNumber, pageSize);
        //    var totalCount = await _unitOfWork.Videos.GetTotalCountAsync();

        //    var result = _mapper.Map<List<VideoResponseDto>>(videos);

        //    return Ok(new
        //    {
        //        TotalItems = totalCount,
        //        PageNumber = pageNumber,
        //        PageSize = pageSize,
        //        TotalPages = (int)Math.Ceiling((double)totalCount / pageSize),
        //        Data = result
        //    });
        //}

        // Get Video BY search
        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] string keyword, [FromQuery] int pagenum, [FromQuery]  int pagesize)
        {
            var videos = await _unitOfWork.Videos.SearchAsync(keyword, pagenum, pagesize);
            var result = _mapper.Map<List<VideoResponseDto>>(videos);

            return Ok(result);
        }

        //Add Video
        //[Authorize(Roles ="Admin")]
        [HttpPost]
       public async Task<IActionResult> AddVideo([FromBody] VideoUploadDto dto)
        {
            var video = _mapper.Map<Video>(dto);

            video.ViewCount = 0;
            video.TotalView = 0;
            video.Ratings = new List<Rating>();

            await _unitOfWork.Videos.AddAsync(video);
            await _unitOfWork.SaveAsync();

            return Ok("Video Upload Successfully");
        }

        // Get video by type
        [HttpGet("type/{type}")]
        public async Task<IActionResult> GetByType(VideoType type, [FromQuery]int pagenum = 1, [FromQuery] int pagesize=10)
        {
            var videos = await _unitOfWork.Videos.GetByTypeAsync(type, pagenum, pagesize);
            var result = _mapper.Map<List<VideoResponseDto>>(videos);

            return Ok(result);
        }

        // update data vide by admin 
        [Authorize(Roles ="Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVideo(int id,[FromBody] VideoUploadDto dto)
        {
            var video = await _unitOfWork.Videos.GetByIdAsync(id);
            if (video == null)
                return NotFound("video not found!");
            //update data is video
            _mapper.Map(dto, video);

            _unitOfWork.Videos.Update(video);
            await _unitOfWork.SaveAsync();

            return Ok("Video Update Successfully");
        }

        // Rating Videos
        [Authorize]
        [HttpPost("{id}/rate")]
        public async Task<IActionResult> AddRating(int id, [FromBody] RateUserDto dto)
        {
            var video = await _unitOfWork.Videos.GetByIdAsync(id);
            if (video == null)
                return NotFound("video not found");

            var result=_mapper.Map<Rating>(dto);
            result.VideoId = id;

            video.Ratings ??= new List<Rating>();
            video.Ratings.Add(result);

            _unitOfWork.Videos.Update(video);
            await _unitOfWork.SaveAsync();

            return Ok("Rating Added Successfully");
        }

        //GetTopVideoViews
        [AllowAnonymous]
        [HttpGet("TopViews")]
        public async Task<IActionResult> GetTopVideos([FromQuery] int count = 5)
        {
            var videos = await _unitOfWork.Videos.GetTopVideosByViewsAsync(count);
            var mapp = _mapper.Map<List<VideoResponseDto>>(videos);
            return Ok(mapp);
        }
        //SoftDeleted
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> SoftDelete(int id)
        {
            await _unitOfWork.Videos.SoftDeleteAsync(id);
            await _unitOfWork.SaveAsync();

            return Ok("Video soft deleted");
        }

        // Restore Video From Delete 
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}/restore")]
        public async Task<IActionResult> RestoreVideo(int id)
        {
            await _unitOfWork.Videos.RestoreAsync(id);
            await _unitOfWork.SaveAsync();

            return Ok("Video restored successfully");
        }

        // Get ALL Videos Deleted
        [Authorize(Roles = "Admin")]
        [HttpGet("AllDeleted")]
        public async Task<IActionResult> GetDeletedVideos()
        {
            var videos = await _unitOfWork.Videos.GetDeletedVideosAsync();
            var result = _mapper.Map<List<VideoResponseDto>>(videos);

            return Ok(result);
        }


//         [AllowAnonymous]
//         [HttpGet("TopViews")]
//         public async Task<IActionResult> GetTopVideos([FromQuery] int n=5)
//         {
//             var videos = await _unitOfWork.Videos.GetTopVideosByViewsAsync(n);
//             var mapp = _mapper.Map<List<VideoResponseDto>>(videos);
//             return Ok(mapp);
//         }

    }
}
