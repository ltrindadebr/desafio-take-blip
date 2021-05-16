import { Injectable, HttpService, BadRequestException } from '@nestjs/common';

import * as qs from 'qs';
import { QueryParamsDto } from './dtos/queryParams.dto';
import { QueryResponseDto, RepositoryDto } from './dtos/queryResponse.dto';

@Injectable()
export class AppService {
  private readonly githubUrl: string;
  private readonly query: QueryParamsDto;

  constructor(private httpService: HttpService) {
    this.githubUrl = 'https://api.github.com/users/takenet';
    this.query = {
      language: 'C#',
      per_page: '5',
      sort: 'created',
      direction: 'asc',
    };
  }

  async getApiInfos(): Promise<QueryResponseDto> {
    try {
      const { language, per_page, sort, direction } = this.query;

      const queryString = qs.stringify({ language, per_page, sort, direction });
      const url = `${this.githubUrl}/repos?${queryString}`;
      const { data } = await this.httpService.get<any>(url).toPromise();

      if (data.length > 0) {
        const repositories: RepositoryDto[] = data.map((repo) => {
          return {
            title: repo.full_name,
            subtitle: repo.description,
            url: repo.html_url,
          };
        });

        return {
          carroselImage: data[0].owner.avatar_url,
          firstRepository: repositories[0],
          secondRepository: repositories[1],
          thirdRepository: repositories[2],
          fourthRepository: repositories[3],
          fifthRepository: repositories[4],
        };
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
