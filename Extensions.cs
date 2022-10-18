using Catalog.Dtos;
using Catalog.Entities;

namespace Catalog
{
    public static class Extensions
    {
        public static ItemDto AsDto(this Item item)
        {
            return new ItemDto
            {
                Id = item.Id,
                Name = item.Name,
                Team = item.Team,
                PassCompletions = item.PassCompletions,
                PassAttempts = item.PassAttempts,
                PassingYards = item.PassingYards,
                PassingTouchDowns = item.PassingTouchDowns,
                Interceptions = item.Interceptions,
                RushingYards = item.RushingYards,
                RushingTouchDowns = item.RushingTouchDowns,
                Image = item.Image
            };
        }
    }
}