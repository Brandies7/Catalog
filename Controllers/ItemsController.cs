using Catalog.Dtos;
using Catalog.Entities;
using Catalog.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.Controllers
{
    [ApiController]
    [Route("items")]
    public class ItemsController : ControllerBase
    {

        private readonly IItemsRepository repository;
        public ItemsController(IItemsRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public async Task<IEnumerable<ItemDto>> GetItemsAsync()
        {
            var items = (await repository.GetItemsAsync()).Select(item => item.AsDto());
            return items;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ItemDto>> GetItemAsync(Guid id)
        {
            var item = await repository.GetItemAsync(id);

            if (item == null)
            {
                return NotFound();
            }
            return item.AsDto();
        }

        [HttpPost]
        public async Task<ActionResult<ItemDto>> CreateItemAsync(CreateItemDto itemDto)
        {
            Item item = new()
            {
                Id = Guid.NewGuid(),
                Name = itemDto.Name,
                Team = itemDto.Team,
                PassCompletions = itemDto.PassCompletions,
                PassAttempts = itemDto.PassAttempts,
                PassingYards = itemDto.PassingYards,
                PassingTouchDowns = itemDto.PassingTouchDowns,
                Interceptions = itemDto.Interceptions,
                RushingYards = itemDto.RushingYards,
                RushingTouchDowns = itemDto.RushingTouchDowns,
                //Photo = itemDto.Photo
                Image = itemDto.Image

            };

            await repository.CreateItemAsync(item);
            return CreatedAtAction(nameof(GetItemAsync), new { id = item.Id }, item.AsDto());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateItemAsync(Guid id, UpdateItemDto itemDto)
        {
            var existingItem = await repository.GetItemAsync(id);

            if (existingItem is null)
            {
                return NotFound();
            }

            Item updateItem = existingItem with
            {
                Name = itemDto.Name,
                Team = itemDto.Team,
                PassCompletions = itemDto.PassCompletions,
                PassAttempts = itemDto.PassAttempts,
                PassingYards = itemDto.PassingYards,
                PassingTouchDowns = itemDto.PassingTouchDowns,
                Interceptions = itemDto.Interceptions,
                RushingYards = itemDto.RushingYards,
                RushingTouchDowns = itemDto.RushingTouchDowns,
                Image = itemDto.Image
            };

            await repository.UpdateItemAsync(updateItem);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteItem(Guid id)
        {
            var existingItem = await repository.GetItemAsync(id);

            if (existingItem is null)
            {
                return NotFound();
            }

            await repository.DeleteItemAsync(id);
            return NoContent();
        }

    }
}
